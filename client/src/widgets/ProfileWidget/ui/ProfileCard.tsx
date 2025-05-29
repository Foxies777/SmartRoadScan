import { Card, Descriptions, Typography, Avatar } from 'antd';
import { useUnit } from 'effector-react';
import { $user } from '@entities/user/model';
import React from 'react';

const { Title } = Typography;

const ProfileCard = () => {
  const user = useUnit($user);

  if (!user) {
    return <Card loading={true} />;
  }

  return (
    <Card 
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Avatar size={64} style={{ backgroundColor: '#1890ff' }}>
            {user.name[0]}{user.surname[0]}
          </Avatar>
          <Title level={4} style={{ margin: 0 }}>
            {user.surname} {user.name} {user.patronymic}
          </Title>
        </div>
      }
      bordered={false}
      style={{ width: '100%', maxWidth: 600 }}
    >
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Логин">{user.login}</Descriptions.Item>
        <Descriptions.Item label="Телефон">{user.phone}</Descriptions.Item>
        <Descriptions.Item label="Роль">{user.role}</Descriptions.Item>
        <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default ProfileCard;