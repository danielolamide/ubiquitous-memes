import React from "react";
import { useAuth } from "./context/AuthContext";
import Authenticated from "./container/Authenticated";
import Unauthenticated from "./components/Unauthenticated";
function App() {
	const { user } = useAuth();
	return user ? <Authenticated /> : <Unauthenticated />;
}

export default App;
