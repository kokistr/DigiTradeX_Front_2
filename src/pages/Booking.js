// src/pages/Booking.js
import React from 'react';

const Booking = () => {
  return (
    <div>
      <div className="bg-blue-100 p-2 mb-4">
        <h2 className="font-medium">ブッキング</h2>
      </div>
      
      <div className="text-center py-10">
        <p className="text-xl mb-4">ブッキングページは現在準備中です。</p>
        <img
          src="/icon_DTX.png"
          alt="準備中のアイコン"
          className="mx-auto w-40 h-auto"
        />
        <p className="text-gray-600">このページは今後実装される予定です。</p>
      </div>
    </div>
  );
};

export default Booking;