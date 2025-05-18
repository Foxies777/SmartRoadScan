import { Modal, Form, Select, InputNumber, DatePicker, Button } from 'antd';
import dayjs from 'dayjs';
import { useUnit } from 'effector-react';
import { $filters, typeChanged, statusChanged, minAreaChanged, maxAreaChanged, dateRangeChanged, resetFilters } from '../model';

interface Props {
  open: boolean;
  onClose: () => void;
}

const FilterModal = ({ open, onClose }: Props) => {
  const filters = useUnit($filters);
  const [form] = Form.useForm();

  const handleApply = () => {
    const values = form.getFieldsValue();
    console.log('🧪 APPLY FILTERS:', values);
    
    typeChanged(values.type || null);  // ← должен вызвать sample → filtersUpdated
    statusChanged(values.status || []);
    minAreaChanged(values.minArea || null);
    maxAreaChanged(values.maxArea || null);
    dateRangeChanged(values.dateRange
      ? [values.dateRange[0].format("YYYY-MM-DD"), values.dateRange[1].format("YYYY-MM-DD")]
      : null
    );
  
    onClose();
  };
  

  const handleReset = () => {
    resetFilters();
    form.resetFields();
  };

  return (
    <Modal open={open} title="Фильтры" onCancel={onClose} onOk={handleApply} footer={null}>
      <Form layout="vertical" form={form} initialValues={filters}>
        <Form.Item name="type" label="Тип">
          <Select options={[{ label: 'online', value: 'online' }, { label: 'offline', value: 'offline' }]} allowClear />
        </Form.Item>
        <Form.Item name="status" label="Статусы">
          <Select mode="multiple" options={[{ label: 'new', value: 'new' }, { label: 'reviewed', value: 'reviewed' }]} allowClear />
        </Form.Item>
        <Form.Item name="minArea" label="Площадь от (см²)">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="maxArea" label="Площадь до (см²)">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="dateRange" label="Дата">
          <DatePicker.RangePicker style={{ width: '100%' }} />
        </Form.Item>
        <div className="flex gap-2 justify-end">
          <Button onClick={handleReset}>Сбросить</Button>
          <Button type="primary" onClick={handleApply}>Применить</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default FilterModal;