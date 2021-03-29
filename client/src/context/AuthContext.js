import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
const AuthContext = React.createContext();
function AuthProvider(props) {
	const { data, isLoading, err } = useQuery("fetchUser", async () => {
		const { data } = await axios.get("http://localhost:5000/auth", {
			withCredentials: true,
		});
		return data;
	});
	if (err) {
		return <div>{err}</div>;
	}
	if (isLoading) {
		return <div>Loading</div>;
	}
	return <AuthContext.Provider value={{ user: data.user }} {...props} />;
}
const useAuth = () => React.useContext(AuthContext);

export { useAuth, AuthProvider };
