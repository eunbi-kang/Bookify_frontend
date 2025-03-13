import React, { useState } from "react";
import { Input, Select, Row, Col, Card } from "antd";
import "./BooksPage.css";

const { Search } = Input;
const { Option } = Select;

// ✅ 예제 도서 데이터
const booksData = [
    { id: 1, title: "그 많던 싱아는 누가 다 먹었을까", author: "박완서", image: "https://image.aladin.co.kr/product/12534/96/cover500/k732532362_1.jpg" },
    { id: 2, title: "The Phantom of the Opera", author: "Gaston Leroux", image: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788992228978.jpg" },
    { id: 3, title: "The Lord of the Rings", author: "J.R.R. Tolkien", image: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p28828_p_v8_ao.jpg" },
];

const BooksPage = () => {
    const [books, setBooks] = useState(booksData);
    const [searchTerm, setSearchTerm] = useState("");

    // ✅ 검색어 입력 시 상태 업데이트
    const handleSearch = (value) => {
        setSearchTerm(value);
        const filteredBooks = booksData.filter(
            (book) =>
                book.title.toLowerCase().includes(value.toLowerCase()) ||
                book.author.toLowerCase().includes(value.toLowerCase())
        );
        setBooks(filteredBooks);
    };

    return (
        <div className="books-container">
            {/* ✅ 검색창 */}
            <div className="search-bar">
                <Select defaultValue="title" className="search-select">
                    <Option value="title">책 제목</Option>
                    <Option value="author">저자</Option>
                    <Option value="isbn">ISBN</Option>
                    <Option value="publisher">출판사</Option>
                </Select>
                <Search
                    placeholder="검색어를 입력하세요"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onSearch={handleSearch}
                    enterButton
                    className="search-input"
                />
            </div>

            {/* ✅ 도서 갤러리 */}
            <Row gutter={[16, 16]} className="books-grid">
                {books.map((book) => (
                    <Col key={book.id} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            className="book-card"
                            hoverable
                            cover={
                                <img
                                    alt={book.title}
                                    src={book.image}
                                    onError={(e) => e.target.src = "https://via.placeholder.com/200x280"}
                                />
                            }
                        >
                            <Card.Meta title={book.title} description={book.author} />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default BooksPage;
