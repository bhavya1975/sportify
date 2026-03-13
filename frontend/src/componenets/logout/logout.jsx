import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

export function Logout(){
    return (
        <div className="flex justify-end">
            <Button variant="outline" size="icon">
                <LogOut className="h-4 w-4"/>
            </Button>
        </div>
    );
}