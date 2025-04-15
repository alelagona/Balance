import { useContext } from 'react';
import SidebarContext from '../context/SidebarContext';

const useSidebarContext = () => {
  return useContext(SidebarContext);
};

export default useSidebarContext;
