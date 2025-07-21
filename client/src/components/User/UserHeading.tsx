

const headings = [
    "All",
    "BreakFast",
    "Lunch",
    "Dinner",
    "Best of All",
    "Cakes",
    "Drinks",
    "All",
    "BreakFast",
    "Lunch",
    "Dinner",
    "Best of All",
    "Cakes",
    "Drinks",
    "All",
    "BreakFast",
    "Lunch",
    "Dinner",
    "Best of All",
    "Cakes",
    "Drinks",
    "All",
    "BreakFast",
    "Lunch",
    "Dinner",
    "Best of All",
    "Cakes",
    "Drinks",
    "All",
    "BreakFast",
    "Lunch",
    "Dinner",
    "Best of All",
    "Cakes",
    "Drinks",
    "All",
    "BreakFast",
    "Lunch",
    "Dinner",
    "Best of All",
    "Cakes",
    "Drinks"
]

const UserHeading = () => {
    return (
      <div className="md:mt-3 mt-1 fixed z-20 top-12 bg-white w-full">
        <div className="flex md:gap-3 gap-1.5 overflow-x-auto md:px-8 px-3 md:py-2 py-1.5">
          {headings.map((items, index) => (
            <div
              className="border-2 rounded-full whitespace-nowrap flex py-0.5 px-2 text-sm"
              key={index}
            >
              {items}
            </div>
          ))}
        </div>
      </div>
    );
  };
  

export default UserHeading
