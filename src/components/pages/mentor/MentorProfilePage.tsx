import { useMentorScope } from '../../../hooks/useMentorScope';
import { PageHeader } from '../../common/PageHeader';

export function MentorProfilePage(){
 const {mentor,myAppointments,enrollments,sessions,reports}=useMentorScope();
 return <div className="space-y-6">
  <PageHeader title="Mentor profile" description="Service-provider information and programme assignments."/>
  <div className="rounded-lg border bg-white p-5 space-y-4">
   <p className="text-xs font-medium text-amber-800">Demo profile — changes are not saved to a production account</p>
   <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div><dt className="text-sm text-gray-500">Name</dt><dd className="font-medium break-words">{mentor.name}</dd></div>
    <div><dt className="text-sm text-gray-500">Organisation</dt><dd className="font-medium break-words">{mentor.company}</dd></div>
    <div><dt className="text-sm text-gray-500">Email</dt><dd className="font-medium break-all">{mentor.email}</dd></div>
    <div><dt className="text-sm text-gray-500">Specialties</dt><dd className="font-medium">{mentor.specialties.join(', ')}</dd></div>
   </dl>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
   {[['Programme appointments',myAppointments.length],['Assigned SMEs',enrollments.length],['Sessions logged',sessions.length],['M&E reports',reports.length]].map(([label,value])=>
    <div key={label} className="rounded-lg border bg-white p-4"><p className="text-sm text-gray-500">{label}</p><p className="text-2xl font-semibold">{value}</p></div>)}
  </div>
 </div>;
}
