import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState([]);
  const [partners, setPartners] = useState([]);
  const [events, setEvents] = useState([]);
  const [publications, setPublications] = useState([]);

  const fetchSubmissions = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/submissions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSubmissions(res.data);
      console.log(submissions);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPartners = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/partners/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPartners(res.data);
      console.log("partners", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchevents = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/events/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchpublication = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/publications/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPublications(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSubmissions();
    fetchPartners();
    fetchevents();
    fetchpublication();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        submissions,
        partners,
        setPartners,
        events,
        setEvents,
        publications,
        setPublications,
        token,
        API_URL,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
