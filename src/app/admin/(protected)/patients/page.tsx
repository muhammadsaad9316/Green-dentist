import PatientsTable from '@/components/admin/PatientsTable';

export default function PatientsPage() {
    return (
        <div className="p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
                <p className="text-gray-500 mt-1">Directory of all registered patients</p>
            </header>

            <PatientsTable />
        </div>
    );
}
