import SettingsForm from '../components/SettingsForm';

const SettingsView = ({ onEditUser }) => {
  return (
    <div className="sign-up-view">
      <SettingsForm onEditUser={onEditUser} />
    </div>
  );
};

export default SettingsView;
