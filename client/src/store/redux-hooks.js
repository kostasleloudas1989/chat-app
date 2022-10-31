import { useDispatch, useSelector } from "react-redux"; 

// define custom Redux hooks
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;