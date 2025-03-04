import { useState } from "react";

interface TrainBookingProps {
  onClose: () => void;
}

const TrainBooking: React.FC<TrainBookingProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-md">
      {step === 1 && (
        <div>
          <h2 className="text-lg font-semibold">Step 1: Train Booking</h2>
          <p>Select your train and confirm details.</p>
          <button onClick={nextStep} className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-lg font-semibold">Step 2: Declaration</h2>
          <p>Agree to the terms and conditions.</p>
          <button onClick={prevStep} className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-md mr-2">
            Back
          </button>
          <button onClick={nextStep} className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
            Next
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-lg font-semibold">Step 3: Payment Form</h2>
          <p>Enter payment details.</p>
          <button onClick={prevStep} className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-md mr-2">
            Back
          </button>
          <button onClick={() => setStep(4)} className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
            Submit
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="text-center">
          <h2 className="text-lg font-semibold text-green-600">🎉 Congratulations!</h2>
          <p>Your booking has been successfully completed.</p>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default TrainBooking;
