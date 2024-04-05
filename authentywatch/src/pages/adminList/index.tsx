import { useGetAllAdmins } from "@/hooks/useGetAllAdmins";
import Layout from "@/components/Layout/Layout";
import { useState, useEffect } from "react";
import { useAddAdmin } from "@/hooks/useAddAdmin";
import { toast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import { useRemoveAdmin } from "@/hooks/useRemoveAdmin";

const AdminList = () => {
  const [adminAddress, setAdminAddress] = useState("");
  const isAdmin = useAdminStatus();

  const {
    removeAdmin,
    isError: isErrorRemoveAdmin,
    error: errorRemoveAdmin,
    isPending: isPendingRemoveAdmin,
    isSuccess: isSuccessRemoveAdmin,
  } = useRemoveAdmin();
  const {
    addAdmin,
    isError: isErrorAddAdmin,
    error: errorAddAdmin,
    isPending,
    isSuccess: isSuccessAddAdmin,
  } = useAddAdmin();
  const {
    admins,
    isLoading: isLoadingGetAdmins,
    isError: isErrorGetAdmins,
    error: errorGetAdmins,
    isSuccess: isSuccessGetAdmins,
  } = useGetAllAdmins();

  useEffect(() => {
    if (isSuccessGetAdmins) {
      setAdminAddress("");
    }
  }, [isSuccessAddAdmin, isSuccessGetAdmins,isSuccessRemoveAdmin ]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await addAdmin(adminAddress);
  };

  if (isLoadingGetAdmins || isPending)
    toast({
      variant: "default",
      title: "Chargement...",
    });
  if (isErrorGetAdmins)
    toast({
      variant: "destructive",
      title: "Erreur lors de la récupération des administrateurs",
    });
  if (isErrorAddAdmin)
    toast({
      variant: "destructive",
      title: "Erreur lors de l'ajout de l'administrateur",
    });

    const handleRemoveAdmin = async (adminAddress: any) => {
      await removeAdmin(adminAddress);
    };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-20">
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              value={adminAddress}
              onChange={(e) => setAdminAddress(e.target.value)}
              placeholder="Adresse de l'administrateur"
              className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              disabled={isPending || isLoadingGetAdmins}
            />
            <button
              type="submit"
              disabled={isPending || isLoadingGetAdmins}
              className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-300 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Ajouter un administrateur
            </button>
          </form>

          <h1 className="text-3xl font-bold text-white my-4">
            Liste des Administrateurs
          </h1>
          <ul className="bg-gray-800 shadow rounded-lg p-4 mb-6">
            {admins.map((admin, index) => (
              <li
                key={index}
                className="text-white py-2 border-b border-gray-700"
              >
                {admin}
                {isAdmin && (
                  <button onClick={() => handleRemoveAdmin(admin)} className="ml-4" type="button">
                  <Trash2 color="red" size={20} />
                </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default AdminList;
