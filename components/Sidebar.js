import { ChatBubbleBottomCenterIcon, ChatBubbleBottomCenterTextIcon, GlobeAltIcon, HeartIcon, HomeIcon, MagnifyingGlassIcon,  } from "@heroicons/react/24/outline";
import CreatePostModal from "./CreatePostModal";


function Sidebar() {
  return (
    <div className="hidden xl:inline border-r border-[#dbdbdb] min-h-screen w-[255px] fixed left-0 pt-10 px-2 bg-white">
      <div className="mb-10 pl-5">
        <img className="w-[120px]" src="./assets/instagram-logo.png" />
      </div>

      <nav>
        <ul>
          <SidebarListItem active={true} />
          <SidebarListItem label="Search" Icon={MagnifyingGlassIcon} />
          <SidebarListItem label="Explore" Icon={GlobeAltIcon} />
          <SidebarListItem label="Messages" Icon={ChatBubbleBottomCenterTextIcon} />
          <SidebarListItem label="Notifications" Icon={HeartIcon} />
          <CreatePostModal />
        </ul>
      </nav>
    </div>
  );
}

function SidebarListItem({ Icon = HomeIcon, label = "Home", active=false }) {
  return (
    <div className="bg-white flex items-center space-x-3 py-3 cursor-pointer hover:bg-black hover:bg-opacity-5 rounded-xl pl-6">
      <Icon className="w-8 h-8" />
      <h3 className={active ? "font-bold" : ""} >{label}</h3>
    </div>
  );
}

export default Sidebar;
