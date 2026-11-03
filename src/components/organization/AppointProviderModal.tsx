import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { FormField } from '../common/FormField';
import { usePlatform } from '../../contexts/PlatformContext';
import { useToast } from '../../contexts/ToastContext';
import { useOrgScope } from '../../hooks/useOrgScope';
import { providers } from '../../data/providers';
import { ProviderScope } from '../../types/platform';
import { inputClass, roleThemes } from '../../utils/roleTheme';

interface AppointProviderModalProps {
  programmeId?: string;
  providerId?: string;
  onClose: () => void;
}

const scopes: {value: ProviderScope;label: string;}[] = [
{ value: 'Development', label: 'Mentoring & development' },
{ value: 'Training', label: 'Training' },
{ value: 'M&E', label: 'Monitoring & evaluation' }];

const field = `${inputClass} ${roleThemes.organization.ring}`;

export function AppointProviderModal({ programmeId, providerId, onClose }: AppointProviderModalProps) {
  const { appointProvider } = usePlatform();
  const { notify } = useToast();
  const { programmes, appointments } = useOrgScope();
  const [selectedProgramme, setSelectedProgramme] = useState(programmeId || programmes[0]?.id || '');
  const [selectedProvider, setSelectedProvider] = useState(providerId || '');
  const [scope, setScope] = useState<ProviderScope[]>(['Development']);
  const [capacity, setCapacity] = useState('6');
  const [error, setError] = useState('');

  const alreadyAppointed = new Set(
    appointments.filter((a) => a.programmeId === selectedProgramme).map((a) => a.providerId)
  );
  const available = providers.filter((p) => !alreadyAppointed.has(p.id) || p.id === providerId);

  const toggleScope = (value: ProviderScope) =>
  setScope((prev) => prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]);

  const submit = () => {
    if (!selectedProgramme || !selectedProvider) return setError('Choose a programme and a provider');
    if (alreadyAppointed.has(selectedProvider)) return setError('This provider is already appointed to that programme');
    if (scope.length === 0) return setError('Select at least one scope of work');
    if (!Number(capacity)) return setError('Set how many beneficiaries they can support');
    appointProvider({
      programmeId: selectedProgramme,
      providerId: selectedProvider,
      scope,
      capacity: Number(capacity)
    });
    const provider = providers.find((p) => p.id === selectedProvider);
    notify(`${provider?.company} appointed`);
    onClose();
  };

  return (
    <Modal
      title="Appoint service provider"
      subtitle="Providers only see beneficiaries in programmes they're appointed to."
      onClose={onClose}
      footer={
      <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submit}>Appoint</Button>
        </>
      }>
      
      <div className="space-y-4">
        <FormField label="Programme" htmlFor="ap-prog" required>
          <select id="ap-prog" className={field} value={selectedProgramme} onChange={(e) => setSelectedProgramme(e.target.value)} disabled={!!programmeId}>
            {programmes.map((p) =>
            <option key={p.id} value={p.id}>
                {p.name}
              </option>
            )}
          </select>
        </FormField>
        <FormField label="Service provider" htmlFor="ap-prov" required>
          <select id="ap-prov" className={field} value={selectedProvider} onChange={(e) => setSelectedProvider(e.target.value)}>
            <option value="">Select a provider</option>
            {available.map((p) =>
            <option key={p.id} value={p.id}>
                {p.company} — {p.name}
              </option>
            )}
          </select>
        </FormField>
        <fieldset>
          <legend className="block text-sm font-medium text-gray-700 mb-2">Scope of work</legend>
          <div className="space-y-2">
            {scopes.map((s) =>
            <label key={s.value} className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" checked={scope.includes(s.value)} onChange={() => toggleScope(s.value)} className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                {s.label}
              </label>
            )}
          </div>
        </fieldset>
        <FormField label="Beneficiary capacity" htmlFor="ap-cap" hint="Maximum number of beneficiaries assigned to this provider.">
          <input id="ap-cap" type="number" min={1} className={field} value={capacity} onChange={(e) => setCapacity(e.target.value)} />
        </FormField>
        {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      </div>
    </Modal>);

}