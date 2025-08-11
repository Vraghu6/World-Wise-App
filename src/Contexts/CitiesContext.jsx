import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const CitiesContext = createContext();
// const Base_URL = "http://localhost:8080";
const Base_URL = import.meta.env.Vite_BASE_URL;
console.log(Base_URL);

const initial_state = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true, error: "" };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  // User loaded once from localStorage on mount
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  console.log(user);
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initial_state
  );

  // Listen for changes to localStorage (multi-tab sync)
  useEffect(() => {
    function onStorageChange() {
      try {
        const updatedUser = JSON.parse(localStorage.getItem("user"));
        setUser(updatedUser);
      } catch {
        setUser(null);
      }
    }
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  // Whenever user changes (login/logout), fetch cities
  useEffect(() => {
    if (!user?.email) {
      dispatch({ type: "cities/loaded", payload: [] }); // clear cities if logged out
      return;
    }

    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const token = user?.token;
        console.log("JWT token sent:", token);

        const res = await fetch(`${Base_URL}/api/cities?email=${user.email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("Response status:", res.status);

        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        console.log(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "rejected", payload: err.message });
      }
    }
    fetchCities();
  }, [user]);

  async function createCity(cityData) {
    if (!user?.token) {
      dispatch({ type: "rejected", payload: "User not authenticated" });
      return;
    }

    dispatch({ type: "loading" });

    try {
      const token = user.token;
      console.log(token);
      const res = await fetch(`${Base_URL}/api/cities?email=${user.email}`, {
        // no email here
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cityData),
      });
      if (!res.ok) throw new Error(`Failed to create city: ${res.status}`);
      const newCity = await res.json();
      dispatch({ type: "city/created", payload: newCity });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      const token = user?.token;
      const res = await fetch(
        `${Base_URL}/api/cities/${id}?email=${user.email}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error(`Failed to delete city: ${res.status}`);
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  // Expose cities and dispatchers; if needed add getCity, createCity, deleteCity here too
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        user,
        setUser, // expose setUser so Login can update on login/logout
        dispatch,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error("useCities must be used within a CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
