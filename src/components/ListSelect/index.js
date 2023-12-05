import React, {useEffect, useState} from 'react';

const ListSelect = ({name, onChange, items, isLoading, doNotChangeOnLoading}) => {
    const [clonedItems] = useState(items);
    const [selected, setSelected] = useState(items.findIndex(obj => obj.selected));

    const onClick = (objectName, idx) => {
        if (doNotChangeOnLoading && isLoading) return;

        setSelected(idx);
        onChange?.({
            target: {name, value: objectName}
        });
    }

    return (
        <>
            {clonedItems.map((item, idx) => <React.Fragment key={idx}>
                {React.cloneElement(item.item,
                    {
                        ...item.props,
                        isSelected: selected === idx,
                        onClick() {
                            onClick(item.name, idx)
                        }
                    })}
            </React.Fragment>)}
        </>
    );
};

export default ListSelect;