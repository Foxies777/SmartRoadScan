import { useState } from 'react';
import { FilterFilled } from '@ant-design/icons';
import { Button } from 'antd';
import FilterModal from '@features/ReportsFilter/ui/FilterModal';

const FilterWidget = () => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <Button
        style={{
          width: '35px',
          height: '35px',
          backgroundColor: 'white',
          position: 'absolute',
          top: '150px',
          left: '20px',
          gap: '0',
          boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 10px'
        }}
        onClick={() => setModal(true)}
        icon={<FilterFilled />}
      />
      <FilterModal open={modal} onClose={() => setModal(false)} />
    </>
  );
};

export default FilterWidget;
