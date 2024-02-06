export const BookCard = ({ book, onClick }) => {
  return (
    <div
      onClick={() => {
        onClick(book);
      }}
    >
      {book.title}
    </div>
  );
};