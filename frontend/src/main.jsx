import { createRoot } from "react-dom/client";
import { UserProvider } from "./context/UserContext";
import { SidebarProvider } from "./context/SidebarContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
	<SidebarProvider>
		<UserProvider>
			<App />
		</UserProvider>
	</SidebarProvider>
);
