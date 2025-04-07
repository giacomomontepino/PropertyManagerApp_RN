import { createContext, useContext, useEffect, useState } from "react";


//file JSON
import mockData from "./api/mockApi.json";
import mockReservation from "./api/mockReservation.json";

const ApiContext = createContext();

export const useApi = () => useContext(ApiContext);

export function ApiProvider({ children }) {
  const [apiData, setApiData] = useState([]);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [attachments, setAttachments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setApiData(mockData);
        setCurrentUser(mockData.users[0]);
        setProperties(mockData.properties);
        setReservations(mockReservation);
        setAttachments(mockData.attachments);
      } catch (error) {
        console.log("Errore nel fetch:", error);
        setError(error);
      }
    };
    fetchData();
  }, []);


  const login = async (email, password) => {
    try {
      const user = apiData.users?.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        alert("Credenziali non trovate");
      }
  

      return {
        ...user,
        success: true,
        sessionToken: user.sessionToken,
      };
    } catch (err) {
      console.log("Errore login:", err);
      throw err;
    }
  };

  //calcolo di tutti i totali
  const totalFutureReservations = properties.map((item) => {
    let total = "0";
    total += item.future_reservations;
    return total;
  });

  let futureReservationsSum = 0;
  for (let i = 0; i < totalFutureReservations.length; i++) {
    futureReservationsSum += parseInt(totalFutureReservations[i]);
  }

  const totalTurnoverByMonth = properties.reduce((acc, property) => {
    property.turnover_trend.forEach((data) => {
      acc[data.monthly] = acc[data.monthly] || 0;
      acc[data.monthly] += data.turnover;
    });
    return acc;
  }, {});

  const totalTurnoverSum = Object.values(totalTurnoverByMonth).reduce(
    (total, current) => total + current,
    0
  );

  return (
    <ApiContext.Provider
      value={{
        login,
        currentUser,
        properties,
        futureReservationsSum,
        totalTurnoverSum,
        totalTurnoverByMonth,
        reservations,
        attachments,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}
