const LoadingSpinner = () => {


  return (


    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111111]">
      {/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
      <div className="three-body">
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
      </div>
    </div>


  );
};

export default LoadingSpinner;