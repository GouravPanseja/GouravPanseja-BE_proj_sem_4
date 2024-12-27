import { HiOutlineMenuAlt1,IoMdAdd } from "../assets/assets";
export default function Navbar2(){
    return(
        <div className="w-full h-[60px] flex items-center border-b  justify-between">

            <div className="flex gap-3">
                <div 
                    className="bg-[#e3e3e3] w-8 h-8 rounded-md md:hidden justify-center items-center cursor-pointer flex"
                    // onClick={()=> setActiveSidebar((prev)=> !prev)}
                >
                    <HiOutlineMenuAlt1 className="text-lg text-white"/>
                </div>
                <div className="px-4 h-8 bg-[#262627] py-2 rounded-md text-sm text-white md:flex hidden justify-center gap-1 items-center cursor-pointer">
                    Create new form
                    <IoMdAdd className="fill-white"/>
                </div>
                <div className="md:flex gap-2 items-center bg-[#e3e3e3] text-white h-8 rounded-md px-3 cursor-pointer hidden">
                    <svg class="SVGInline-svg"  width="23" height="22" viewBox="0 0 19 18" fill="#8a51dd" xmlns="http://www.w3.org/2000/svg"><path d="M15.102 6.99833C15.1627 7.18067 15.4207 7.18067 15.4814 6.99833L16.2917 4.56754L18.7225 3.75728C18.9048 3.6965 18.9048 3.43859 18.7225 3.37781L16.2917 2.56754L15.4814 0.136755C15.4207 -0.0455847 15.1627 -0.0455849 15.102 0.136754L14.2917 2.56754L11.8609 3.37781C11.6786 3.43859 11.6786 3.6965 11.8609 3.75728L14.2917 4.56754L15.102 6.99833ZM9.79169 8.06754L7.74688 3.56895C7.56924 3.17815 7.01415 3.17815 6.83651 3.56895L4.7917 8.06754L0.293099 10.1124C-0.0976992 10.29 -0.0976999 10.8451 0.293098 11.0227L4.7917 13.0675L6.83651 17.5661C7.01415 17.9569 7.56924 17.9569 7.74688 17.5661L9.79169 13.0675L14.2903 11.0227C14.6811 10.8451 14.6811 10.29 14.2903 10.1124L9.79169 8.06754Z"></path></svg>
                    <p className="text-sm ">Generate with AI</p>
                </div>
                <div className="h-8 px-3 bg-[#e3e3e3] flex items-center justify-center rounded-md md:hidden">
                    <svg class="SVGInline-svg"  width="23" height="22" viewBox="0 0 19 18" fill="#8a51dd" xmlns="http://www.w3.org/2000/svg"><path d="M15.102 6.99833C15.1627 7.18067 15.4207 7.18067 15.4814 6.99833L16.2917 4.56754L18.7225 3.75728C18.9048 3.6965 18.9048 3.43859 18.7225 3.37781L16.2917 2.56754L15.4814 0.136755C15.4207 -0.0455847 15.1627 -0.0455849 15.102 0.136754L14.2917 2.56754L11.8609 3.37781C11.6786 3.43859 11.6786 3.6965 11.8609 3.75728L14.2917 4.56754L15.102 6.99833ZM9.79169 8.06754L7.74688 3.56895C7.56924 3.17815 7.01415 3.17815 6.83651 3.56895L4.7917 8.06754L0.293099 10.1124C-0.0976992 10.29 -0.0976999 10.8451 0.293098 11.0227L4.7917 13.0675L6.83651 17.5661C7.01415 17.9569 7.56924 17.9569 7.74688 17.5661L9.79169 13.0675L14.2903 11.0227C14.6811 10.8451 14.6811 10.29 14.2903 10.1124L9.79169 8.06754Z"></path></svg>
                </div>
            </div>

            <div className="flex gap-3 ">

                

                <select className="bg-[#e3e3e3] items-center justify-center text-sm h-8  md:px-3 px-1 outline-none rounded-md">
                    <option className="text-md px-3">Alphabatically</option>
                    <option className="text-md">Last Updated</option>
                    <option className="text-md">Date Created</option>
                
                </select>
                
            </div>

        </div>
    )
}