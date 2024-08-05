import React, { useState, useContext, createContext, useMemo } from "react";

type EditContextProps = {
  selectedItems: number[];
  setSelectedItems: React.Dispatch<React.SetStateAction<number[]>>;
  isAllChecked: boolean;
  setIsAllChecked: React.Dispatch<React.SetStateAction<boolean>>;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditContext = createContext<EditContextProps | undefined>(undefined);

type EditProviderProps = {
  children: React.ReactNode;
};

const EditProvider: React.FC<EditProviderProps> = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const provider = useMemo<EditContextProps>(
    () => ({
      selectedItems,
      setSelectedItems,
      isAllChecked,
      setIsAllChecked,
      editMode,
      setEditMode,
    }),
    [selectedItems, isAllChecked, editMode]
  );

  return <EditContext.Provider value={provider}>{children}</EditContext.Provider>;
};

export default EditProvider;

export const useEditContext = () => {
  const context = useContext(EditContext);
  if (!context) {
    throw new Error("useEditContext must be used within an EditProvider");
  }
  return context;
};
