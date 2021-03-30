import { useAuth } from "../../context/AuthContext";
export default function Avatar() {
	const { user } = useAuth();
	return (
		<img
			src={user.photos}
			alt="user-profile"
			referrerPolicy="no-referrer"
			className="flex items-center justify-center w-10 h-10 rounded-full"
		/>
	);
}
