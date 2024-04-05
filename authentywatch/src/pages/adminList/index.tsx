import { useGetAllAdmins } from "@/hooks/useGetAllAdmins";
import Layout from "@/components/Layout/Layout";
import { useState, useEffect } from "react";
import { useAddAdmin } from '@/hooks/useAddAdmin';

const AdminList = () => {
  const [adminAddress, setAdminAddress] = useState("");
  const { addAdmin, isError: isErrorAddAdmin, error: errorAddAdmin, isPending, isSuccess } = useAddAdmin();
  const { admins, isLoading: isLoadingGetAdmins, isError: isErrorGetAdmins, error: errorGetAdmins, refetch: refetchAdmins } = useGetAllAdmins();

  useEffect(() => {
    if (isSuccess) {
      refetchAdmins();
      setAdminAddress(''); // Réinitialisation de l'adresse après l'ajout
    }
  }, [isSuccess, refetchAdmins]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addAdmin(adminAddress);
  };

  if (isLoadingGetAdmins || isPending) return <div>Chargement...</div>;
  if (isErrorGetAdmins) return <div>Erreur : {errorGetAdmins.message}</div>;
  if (isErrorAddAdmin) return <div>Erreur lors de l'ajout : {errorAddAdmin.message}</div>;

  return (
    <Layout>
      <div className="mt-20 space-x-4">
        <h1 className="text-white text-xl font-semibold ml-4 mb-2">Liste des Administrateurs</h1>
        <ul>
          {admins.map((admin, index) => (
            <li className="text-white" key={index}>- {admin}</li>
          ))}
        </ul>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={adminAddress}
              onChange={(e) => setAdminAddress(e.target.value)}
              placeholder="Adresse de l'administrateur"
              className="text-black"
              disabled={isPending}
            />
            <button type="submit" disabled={isPending} className="ml-2 text-white">Ajouter un administrateur</button>
          </form>
          {isErrorAddAdmin && <p className="text-red-500">Erreur : {errorAddAdmin.message}</p>}
        </div>
      </div>
    </Layout>
  );
};

export default AdminList;
