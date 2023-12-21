import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // State variables
  const [selectedService, setSelectedService] = useState("Academic writing");
  const [selectedGrade, setSelectedGrade] = useState("High school");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(12);
  const [pw, setPw] = useState("pages");

  // Options for services and grades
  const services = [
    "Academic writing",
    "Editing and proofreading",
    "Calculations",
  ];
  const grades = ["High school", "Undergraduate", "Bachelor", "Professionals"];

  // Effect to calculate price when selectedService, selectedGrade, or quantity changes
  useEffect(() => {
    calculatePrice();
  }, [selectedService, selectedGrade, quantity]);

  // Event handlers for button clicks
  const handleServiceChange = (event) => {
    setSelectedService(event);
  };

  const handleGradeChange = (event) => {
    setSelectedGrade(event);
  };

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value, 10));
  };

  // Function to convert quantity between pages and words
  const pageToWord = () => {
    setQuantity(quantity * 275);
    setPw("words");
    document.getElementById('quantity').disabled = true;
  };

  const wordToPage = () => {
    setQuantity(quantity / 275);
    setPw("pages");
    document.getElementById('quantity').disabled = false;
  };

  // Function to make API call and update price
  const calculatePrice = async () => {
    try {
      const response = await axios.post('http://localhost:3001/calculatePrice', {
        service: selectedService,
        grade: selectedGrade,
        quantity,
      });

      setPrice(response.data.price);
    } catch (error) {
      console.error('Error calculating price:', error);
    }
  };

  // JSX for the component
  return (
    <>
      <div className="bg-purple-200 h-[100vh] flex justify-center items-center ">
        <div className=" h-[80vh] w-[50vw] rounded-3xl flex flex-col justify-center bg-white shadow-inherit">
          <div className=" h-[30%] flex flex-col justify-around ">
            {/* Buttons for selecting services */}
            <div className=" flex justify-evenly">
              {services.map((service) => (
                <button
                  key={service}
                  className={`bg-purple-500 text-white px-4 py-3 rounded-2xl ${
                    selectedService === service ? "text-[#000]" : ""
                  }`}
                  onClick={() => handleServiceChange(service)}
                >
                  {service}
                </button>
              ))}
            </div>
            {/* Buttons for selecting grades */}
            <div className=" flex justify-evenly">
              {grades.map((grade) => (
                <button
                  key={grade}
                  className={`bg-purple-500 text-white px-4 py-3 rounded-2xl ${
                    selectedGrade === grade ? "text-[#000]" : ""
                  }`}
                  onClick={() => handleGradeChange(grade)}
                >
                  {grade}
                </button>
              ))}
            </div>
          </div>
          {/* Dropdown for selecting type of paper */}
          <div className="flex flex-col px-5">
            <label htmlFor="options" className="text-xl my-2">
              Type of paper
            </label>
            <select name="" id="options" className="border-2 p-2 rounded-xl">
              <option value="">Research paper</option>
              <option value="">Research proposal</option>
              <option value="">Speech</option>
              <option value="">Thesis</option>
              <option value="">Thesis proposal</option>
              <option value="">Thesis statement</option>
            </select>
          </div>
          {/* Input for quantity and buttons for converting between pages and words */}
          <div className="flex px-5 justify-between">
            <div className="flex flex-col w-[47%] my-2">
              <label htmlFor="quantity" className="mb-2">
                Quantity
              </label>
              <input
                type="number"
                name=""
                id="quantity"
                value={quantity}
                className=" p-1 mb-2 border-2 rounded-lg"
                onChange={handleQuantityChange}
              />
              <div className="flex justify-around">
                <button
                  className={`bg-purple-500 text-white px-8 py-2 rounded-xl ${
                    pw === "pages" ? "text-[#000]" : ""
                  }`}
                  onClick={wordToPage}
                >
                  Pages
                </button>
                <button
                  className={`bg-purple-500 text-white px-8 py-2 rounded-xl ${
                    pw === "words" ? "text-[#000]" : ""
                  }`}
                  onClick={pageToWord}
                >
                  Words
                </button>
              </div>
            </div>
            {/* Input for selecting a deadline */}
            <div className="flex flex-col w-[47%] my-2">
              <label htmlFor="deadline" className="mb-2">
                Deadline
              </label>
              <input
                type="date"
                name=""
                id="deadline"
                className="p-1 mb-2 border-2 rounded-lg"
              />
            </div>
          </div>
          {/* Display approximate price and button to proceed to order */}
          <div className="flex justify-around my-2">
            <div className="flex flex-col items-center">
              <h5>Approx. Price</h5>
              <h2 className="font-bold ">$ {price}</h2>
            </div>
            <div>
              <button className="bg-amber-400 px-4 py-3 rounded-2xl">
                PROCEED TO ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;