import React from 'react';

function AnimatedLoader() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Animated background particles */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        opacity: 0.1
      }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 100 + 50 + 'px',
              height: Math.random() * 100 + 50 + 'px',
              borderRadius: '50%',
              background: 'white',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Main loader content */}
      <div style={{
        position: 'relative',
        zIndex: 10
      }}>
        {/* Spinning logo/icon */}
        <div style={{
          width: '100px',
          height: '100px',
          margin: '0 auto 30px',
          position: 'relative'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            border: '4px solid rgba(255,255,255,0.2)',
            borderTop: '4px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '40px'
          }}>
           <img src="./avs_logo.png" alt=""  style={{ height:"30px" }} />
          </div>
        </div>

        {/* Text content */}
        <div style={{
          textAlign: 'center',
          color: 'white'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            margin: '0 0 10px 0',
            animation: 'fadeIn 1s ease-in'
          }}>
            Welcome 
          </h1>
          <p style={{
            fontSize: '18px',
            margin: '0',
            opacity: 0.9,
            animation: 'fadeIn 1.5s ease-in'
          }}>
             To Avs MNRL & Fraud Risk Management Solution...
          </p>
        </div>

        {/* Loading bar */}
        <div style={{
          width: '300px',
          height: '4px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '2px',
          margin: '30px auto 0',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            background: 'white',
            borderRadius: '2px',
            animation: 'loadingBar 2s ease-in-out infinite'
          }} />
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes loadingBar {
          0% { width: 0%; margin-left: 0%; }
          50% { width: 75%; margin-left: 0%; }
          100% { width: 0%; margin-left: 100%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-30px) translateX(20px); }
          66% { transform: translateY(-15px) translateX(-20px); }
        }
      `}</style>
    </div>
  );
}

export default AnimatedLoader;