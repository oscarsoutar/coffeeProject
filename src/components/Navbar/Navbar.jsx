import { useUserProfile } from '../../layouts/BaseLayout';
import './Navbar.css';
{/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link> */}

export default function Navbar() {
  const userProfile = useUserProfile();
  console.log('userProfile', userProfile);
  if (userProfile?.role == 'staff') {
    return (
      <>
        <div className='navbar'>
          <ul>
            <li>
              <a href='/'>Brew Bliss Cafe</a>
            </li>
            <li>
              <a href='/'>Home</a>
            </li>
            <li>
              <a href='/product'>Products</a>
            </li>
            <li>
              <a href='/about'>About</a>
            </li>
            <li>
              <a href='/orders'>Orders</a>
            </li>
            <div className='login'>
              {userProfile ? (
                <a onClick={() => localStorage.clear()} href = '/'>Logout</a>
                ) : (
                  <p></p>
                  )}
            </div>
            <div className='login'>
              {userProfile ? (
                <a href='/profile'>{userProfile.username}</a>
                ) : (
                  <a href='/login'>Login</a>
                )}
            </div>
          </ul>
        </div>
      </>
    );
  }
  else {
    return (
      <>
        <div className='navbar'>
          <ul>
            <li>
              <a href='/'>Brew Bliss Cafe</a>
            </li>
            <li>
              <a href='/'>Home</a>
            </li>
            <li>
              <a href='/product'>Products</a>
            </li>
            <li>
              <a href='/about'>About</a>
            </li>
            <div className='login'>
              {userProfile ? (
                <a onClick={() => localStorage.clear()}href = '/'>Logout</a>
              ) : (
                <p></p>
              )}
            </div>
            <div className='login'>
              {userProfile ? (
                <>
                  <a href='/profile'>{userProfile.username}</a>
                  {/* <div className='cart'> */}
                    <a href='/cart'>cart</a>
                  {/* </div> */}
                </>
              ) : (
                <a href='/login'>Login</a>
              )}
            </div>
            {/* <div className='cart'> */}
              {/* <a href='/cart'>Cart({quantity})</a> */}
              {/* <a href='/cart'>Cart</a>
            </div> */}
          </ul>
        </div>
      </>
    );
  }
}