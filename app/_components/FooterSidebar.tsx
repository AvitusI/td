import { EllipsisVertical } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Logout } from "./Logout"


export const FooterSidebar = () => {
    return (
        <div className="flex justify-between items-center w-full bg-gray-100 p-4 rounded-md">
            <span className="text-sm truncate">avitussweetbert213@gmail.com</span>
            <span className="rounded-full p-2 hover:bg-gray-300 focus:bg-gray-400">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        
                            <EllipsisVertical size={16} />
                        
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <Logout />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </span>
        </div>
    )
}