import { ChangeEvent, useEffect, useState } from "react";
import { useEditContext } from "../../context/edit.context";
import { useSearchContext } from "../../context/search.context";

import { Copy, Trash, Edit, withSvgStyles } from "../svg";
import { CheckBoxInput } from "..";
import "./ToolTip.css";

const Tooltip = () => {
  const CopyIcon = withSvgStyles(Copy);
  const TrashIcon = withSvgStyles(Trash);
  const EditIcon = withSvgStyles(Edit);

  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const { setSearchData, searchData } = useSearchContext();
  const { selectedItems, setSelectedItems, isAllChecked, setIsAllChecked, editMode, setEditMode } =
    useEditContext();

  const handleOnClickEditMode = () => setEditMode((prev) => !prev);

  const handleChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    setIsAllChecked(event.target.checked);
    if (event.target.checked) {
      setSelectedItems(searchData?.items?.map((item) => item?.id) || []);
    } else {
      setSelectedItems([]);
    }
  };

  const handleDeleteSelectedItems = () => {
    if (searchData) {
      const updatedData = {
        ...searchData,
        items: searchData.items.filter((item) => !selectedItems.includes(item.id)),
      };
      setSearchData(updatedData);
      setSelectedItems([]);
      setIsAllChecked(false);
    }
  };

  const handleCopySelectedItems = () => {
    if (searchData) {
      const itemsToCopy = searchData.items.filter((item) => selectedItems.includes(item.id));
      const maxId = Math.max(...searchData.items.map((i) => i.id));
      const newItems = itemsToCopy.map((item, index) => ({
        ...item,
        id: maxId + index + 1,
      }));

      const updatedData = {
        ...searchData,
        items: [...searchData.items, ...newItems],
      };

      setSearchData(updatedData);
    }
  };

  useEffect(() => {
    if (selectedItems.length === (searchData?.items.length || 0)) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  }, [selectedItems, searchData?.items?.length, setIsAllChecked]);

  useEffect(() => {
    setIsDisabled(selectedItems.length === 0);
  }, [selectedItems]);

  return (
    <div className="tooltip__container" data-testid="tooltip-container">
      {searchData?.items && searchData?.items.length >= 1 && (
        <>
          <div className="tooltip__subcontainer">
            {editMode && (
              <>
                <CheckBoxInput checked={isAllChecked} onChangeCheckbox={handleChangeCheckbox} />

                <p>
                  <span>{selectedItems?.length}</span>
                  {selectedItems?.length <= 1 ? " element" : " elements"} selected
                </p>
              </>
            )}
          </div>

          <div className="tooltip__icons">
            {editMode && (
              <div
                className={`tooltip__tools ${isDisabled ? "tooltip__tools--disabled" : ""}`}
                aria-disabled={isDisabled}
              >
                <CopyIcon
                  width="2.5rem"
                  height="2.5rem"
                  fill="grey"
                  bgColor="white"
                  hoverFillColor="white"
                  hoverBgColor="grey"
                  onClick={handleCopySelectedItems}
                  title="copy element"
                />
                <TrashIcon
                  width="2.5rem"
                  height="2.5rem"
                  fill="grey"
                  bgColor="white"
                  hoverFillColor="white"
                  hoverBgColor="grey"
                  onClick={handleDeleteSelectedItems}
                  title="delete element"
                />
              </div>
            )}
            <EditIcon
              width="2.5rem"
              height="2.5rem"
              fill="grey"
              stroke="grey"
              bgColor="white"
              hoverFillColor="white"
              hoverBgColor="grey"
              onClick={handleOnClickEditMode}
              title="edit mode"
              role="edit"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Tooltip;
