import React, { useState } from 'react';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { FormField } from '../common/FormField';
import { usePlatform } from '../../contexts/PlatformContext';
import { useToast } from '../../contexts/ToastContext';
import { currentOrganizationId } from '../../data/organizations';
import { ProgrammeType } from '../../types/platform';
import { inputClass, roleThemes } from '../../utils/roleTheme';
import { createId } from '../../utils/format';

interface CreateProgrammeModalProps {
  onClose: () => void;
}

interface MilestoneDraft {
  id: string;
  title: string;
  dueDate: string;
  trancheAmount: string;
}

const types: ProgrammeType[] = ['Incubation', 'Accelerator', 'Grant', 'Loan'];
const field = `${inputClass} ${roleThemes.organization.ring}`;

export function CreateProgrammeModal({ onClose }: CreateProgrammeModalProps) {
  const { createProgramme } = usePlatform();
  const { notify } = useToast();
  const [name, setName] = useState('');
  const [type, setType] = useState<ProgrammeType>('Incubation');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [description, setDescription] = useState('');
  const [kpis, setKpis] = useState('Jobs created, Revenue growth');
  const [milestones, setMilestones] = useState<MilestoneDraft[]>([
  { id: createId('m'), title: '', dueDate: '', trancheAmount: '' }]
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateMilestone = (id: string, patch: Partial<MilestoneDraft>) =>
  setMilestones((prev) => prev.map((m) => m.id === id ? { ...m, ...patch } : m));

  const submit = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = 'Give the programme a name';
    if (!startDate) next.startDate = 'Required';
    if (!endDate) next.endDate = 'Required';
    if (startDate && endDate && endDate <= startDate) next.endDate = 'Must be after the start date';
    if (!budget || Number(budget) <= 0) next.budget = 'Enter the total budget';
    setErrors(next);
    if (Object.keys(next).length) return;

    createProgramme({
      organizationId: currentOrganizationId,
      name: name.trim(),
      type,
      startDate,
      endDate,
      budget: Number(budget),
      description: description.trim(),
      status: 'Open for applications',
      kpis: kpis.split(',').map((k) => k.trim()).filter(Boolean),
      milestones: milestones.
      filter((m) => m.title.trim()).
      map((m) => ({
        id: m.id,
        title: m.title.trim(),
        dueDate: m.dueDate,
        trancheAmount: Number(m.trancheAmount) || 0
      }))
    });
    notify(`${name.trim()} created and open for applications`);
    onClose();
  };

  return (
    <Modal
      title="New programme"
      subtitle="Set up the cohort, funded milestones and KPIs providers will report against."
      onClose={onClose}
      size="lg"
      footer={
      <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submit}>Create programme</Button>
        </>
      }>
      
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <FormField label="Programme name" htmlFor="p-name" required error={errors.name}>
              <input id="p-name" className={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Township Manufacturing Incubator 2027" />
            </FormField>
          </div>
          <FormField label="Type" htmlFor="p-type" required>
            <select id="p-type" className={field} value={type} onChange={(e) => setType(e.target.value as ProgrammeType)}>
              {types.map((t) =>
              <option key={t}>{t}</option>
              )}
            </select>
          </FormField>
          <FormField label="Start date" htmlFor="p-start" required error={errors.startDate}>
            <input id="p-start" type="date" className={field} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </FormField>
          <FormField label="End date" htmlFor="p-end" required error={errors.endDate}>
            <input id="p-end" type="date" className={field} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </FormField>
          <FormField label="Total budget (R)" htmlFor="p-budget" required error={errors.budget}>
            <input id="p-budget" type="number" min={0} className={field} value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="2500000" />
          </FormField>
        </div>
        <FormField label="Description" htmlFor="p-desc">
          <textarea id="p-desc" rows={2} className={field} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Who it's for and what support beneficiaries receive" />
        </FormField>
        <FormField label="KPIs" htmlFor="p-kpis" hint="Comma separated. Providers report against these.">
          <input id="p-kpis" className={field} value={kpis} onChange={(e) => setKpis(e.target.value)} />
        </FormField>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Funded milestones</h3>
              <p className="text-xs text-gray-500">Tranches are released when you approve a provider's sign-off.</p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setMilestones((prev) => [...prev, { id: createId('m'), title: '', dueDate: '', trancheAmount: '' }])}>
              
              <PlusIcon className="w-4 h-4" />
              Add
            </Button>
          </div>
          <div className="space-y-2">
            {milestones.map((m, i) =>
            <div key={m.id} className="grid grid-cols-12 gap-2 items-center">
                <input aria-label={`Milestone ${i + 1} title`} className={`${field} col-span-12 sm:col-span-6`} placeholder="Milestone" value={m.title} onChange={(e) => updateMilestone(m.id, { title: e.target.value })} />
                <input aria-label={`Milestone ${i + 1} due date`} type="date" className={`${field} col-span-5 sm:col-span-3`} value={m.dueDate} onChange={(e) => updateMilestone(m.id, { dueDate: e.target.value })} />
                <input aria-label={`Milestone ${i + 1} tranche`} type="number" min={0} className={`${field} col-span-5 sm:col-span-2`} placeholder="Tranche R" value={m.trancheAmount} onChange={(e) => updateMilestone(m.id, { trancheAmount: e.target.value })} />
                <button
                onClick={() => setMilestones((prev) => prev.filter((x) => x.id !== m.id))}
                className="col-span-2 sm:col-span-1 p-2 text-gray-400 hover:text-red-600 justify-self-center"
                aria-label={`Remove milestone ${i + 1}`}>
                
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>);

}