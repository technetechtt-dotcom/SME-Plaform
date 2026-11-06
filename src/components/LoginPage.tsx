import React, { useState } from 'react';
import {
  BuildingIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  LandmarkIcon,
  LoaderIcon,
  LockIcon,
  MailIcon } from
'lucide-react';
import { Role } from '../types/platform';
import { roleThemes, inputClass } from '../utils/roleTheme';

interface LoginPageProps {
  onLogin: (role: Role) => void;
}

const roleOptions: {
  role: Role;
  title: string;
  description: string;
  example: string;
  email: string;
  icon: React.ReactNode;
}[] = [
{
  role: 'organization',
  title: 'Enterprise Development Organization',
  description: 'Run programmes, appoint service providers, review M&E and deploy funding.',
  example: 'e.g. NYDA, SEDFA, IDC, NEF, TIA',
  email: 'programmes@nyda.gov.za',
  icon: <LandmarkIcon className="w-5 h-5" />
},
{
  role: 'mentor',
  title: 'Service Provider / Mentor',
  description: 'Coach your assigned beneficiaries, log sessions, set tasks and report back.',
  example: 'e.g. mLab, AB4iR, appointed coaches',
  email: 'sarah@thriveadvisory.co.za',
  icon: <GraduationCapIcon className="w-5 h-5" />
},
{
  role: 'beneficiary',
  title: 'Beneficiary / Incubatee',
  description: 'Follow your programme, complete tasks and track milestones with your mentor.',
  example: 'SMEs and start-ups in a programme',
  email: 'sipho@mahlangufresh.co.za',
  icon: <BriefcaseIcon className="w-5 h-5" />
}];


export function LoginPage({ onLogin }: LoginPageProps) {
  const [role, setRole] = useState<Role>('organization');
  const [email, setEmail] = useState(roleOptions[0].email);
  const [password, setPassword] = useState('demo-password');
  const [isLoading, setIsLoading] = useState(false);
  const theme = roleThemes[role];

  const selectRole = (next: Role) => {
    setRole(next);
    setEmail(roleOptions.find((o) => o.role === next)?.email || '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    window.setTimeout(() => {
      setIsLoading(false);
      onLogin(role);
    }, 600);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 grid lg:grid-cols-2">
      <section className="hidden lg:flex flex-col justify-between bg-gray-900 text-white p-12">
        <div className="flex items-center gap-2 text-lg font-bold">
          <BuildingIcon className="w-6 h-6 text-amber-500" aria-hidden="true" />
          EDP Connect
        </div>
        <div className="max-w-md">
          <h1 className="text-4xl font-semibold leading-tight">
            One place for enterprise development programmes.
          </h1>
          <p className="mt-4 text-gray-300">
            Organizations run programmes and fund growth. Appointed service providers mentor,
            train and report. Beneficiaries build their businesses — with every session, task and
            milestone accounted for.
          </p>
        </div>
        <ol className="space-y-3 text-sm text-gray-300">
          <li className="flex gap-3">
            <span className="text-amber-500 font-semibold">Organization</span>
            <span>creates a programme and appoints providers</span>
          </li>
          <li className="flex gap-3">
            <span className="text-green-500 font-semibold">Provider</span>
            <span>coaches beneficiaries and submits M&amp;E reports</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-400 font-semibold">Beneficiary</span>
            <span>completes tasks and reaches funded milestones</span>
          </li>
        </ol>
      </section>

      <section className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-gray-900">Sign in</h2>
          <p className="mt-1 text-sm text-gray-500">Choose how you take part in the programme.</p>
          <div role="status" className="mt-4 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-950">Demo only: selecting a role grants access without verifying credentials. Do not enter a real password or personal information. Production authentication is not yet implemented.</div>

          <fieldset className="mt-6">
            <legend className="sr-only">Account type</legend>
            <div className="space-y-2">
              {roleOptions.map((option) => {
                const selected = option.role === role;
                const t = roleThemes[option.role];
                return (
                  <label
                    key={option.role}
                    className={`flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors duration-150 ${selected ? 'border-gray-900 bg-white shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                    
                    <input
                      type="radio"
                      name="role"
                      value={option.role}
                      checked={selected}
                      onChange={() => selectRole(option.role)}
                      className="sr-only" />
                    
                    <span className={`mt-0.5 w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0 ${t.badge}`}>
                      {option.icon}
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-semibold text-gray-900">{option.title}</span>
                      <span className="block text-sm text-gray-600">{option.description}</span>
                      <span className="block mt-1 text-xs text-gray-400">{option.example}</span>
                    </span>
                    <span
                      className={`mt-1 w-4 h-4 rounded-full border-2 flex-shrink-0 ${selected ? 'border-gray-900 bg-gray-900 ring-2 ring-white ring-inset' : 'border-gray-300'}`}
                      aria-hidden="true" />
                    
                  </label>);

              })}
            </div>
          </fieldset>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${inputClass} ${theme.ring} pl-9`} />
                
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${inputClass} ${theme.ring} pl-9`} />
                
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 ${theme.button}`}>
              
              {isLoading && <LoaderIcon className="w-4 h-4 animate-spin" aria-hidden="true" />}
              {isLoading ? 'Signing in…' : `Continue to ${theme.portal}`}
            </button>
            <p className="text-xs text-center text-gray-400">Demo accounts are pre-filled.</p>
          </form>
        </div>
      </section>
    </div>);

}