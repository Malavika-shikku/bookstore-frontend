import { faBagShopping, faBook, faGear, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../../services/serverUrl';
import { adminProfileUpdateContext } from '../../context/ContextSearch';

const AdminSidebar = () => {
  const [activePage, setActivePage] = useState('');
  const [adminDetail, setAdminDetail] = useState({ username: '', profile: '' });

  const navigate = useNavigate();
  const { adminProfileUpdateStatus } = useContext(adminProfileUpdateContext);

  useEffect(() => {
    const path = window.location.pathname;
    setActivePage(path);

    const updatedProfile =
      adminProfileUpdateStatus && adminProfileUpdateStatus.username
        ? adminProfileUpdateStatus
        : JSON.parse(sessionStorage.getItem('existingUser'));

    if (updatedProfile) {
      setAdminDetail({
        username: updatedProfile.username,
        profile: updatedProfile.profile || '',
      });
    }
  }, [adminProfileUpdateStatus]);

  const handleNavigation = (page) => {
    navigate(page);
    setActivePage(page);
  };

  return (
    <div className="admin-sidebar text-center p-6">
      <img
        src={
          adminDetail.profile
            ? `${serverUrl}/uploads/${adminDetail.profile}`
            : 'https://static.vecteezy.com/system/resources/previews/018/742/015/original/minimal-profile-account-symbol-user-interface-theme-3d-icon-rendering-illustration-isolated-in-transparent-background-png.png'
        }
        alt="Admin Profile"
        className="w-36 h-36 rounded-full mx-auto shadow-md object-cover border-4 border-blue-200"
      />
      <h1 className="mt-3 font-semibold text-lg text-gray-700">
        {adminDetail.username}
      </h1>

      <div className="my-6 text-left space-y-3">
        {[
          { id: 'home', icon: faHouse, label: 'Home', path: '/admin-home' },
          { id: 'book', icon: faBook, label: 'All Books', path: '/admin-book' },
          { id: 'career', icon: faBagShopping, label: 'Careers', path: '/admin-career' },
          { id: 'settings', icon: faGear, label: 'Settings', path: '/admin-settings' },
        ].map((item) => (
          <div key={item.id} className="flex items-center">
            <input
              type="radio"
              name="sidebar"
              id={item.id}
              checked={activePage === item.path}
              readOnly
            />
            <label
              htmlFor={item.id}
              className="ms-3 cursor-pointer hover:text-blue-600"
              onClick={() => handleNavigation(item.path)}
            >
              <FontAwesomeIcon icon={item.icon} className="me-3" /> {item.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
