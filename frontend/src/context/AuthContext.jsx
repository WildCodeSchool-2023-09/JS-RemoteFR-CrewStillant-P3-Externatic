import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({});
  const [search, setSearch] = useState("");
  const [user, setUser] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth?.userTypeId === 1) {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/candidate/`,
            {
              headers: { Authorization: `Bearer ${auth?.token}` },
            }
          );
          if (res.data && res.data.length >= 2) {
            setUser(res.data[0]);
            setType(res.data[1]);
          }
        } catch (error) {
          console.error("Error fetching candidate data:", error);
        }
      } else if (auth?.userTypeId === 2) {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/company/`,
            {
              headers: { Authorization: `Bearer ${auth?.token}` },
            }
          );
          if (res.data) {
            setUser(res.data[0]);
            setType(res.data[1]);
          }
        } catch (error) {
          console.error("Error fetching company data:", error);
        }
      } else if (auth?.userTypeId === 3) {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/admin/`,
            {
              headers: { Authorization: `Bearer ${auth?.token}` },
            }
          );
          if (res.data) {
            setUser(res.data[0]);
            setType(res.data[1]);
          }
        } catch (error) {
          console.error("Error fetching admin data:", error);
        }
      }
    };

    fetchUserData();
  }, [auth?.token, type]);

  const contextValue = React.useMemo(
    () => ({
      auth,
      setAuth,
      search,
      setSearch,
      user,
      type,
      setType,
    }),
    [auth, setAuth, search, setSearch, user, type, setType]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
