import styled from "styled-components";

function EventCard({ evento, onSelect }) {
  return (
    <Card onClick={() => onSelect(evento)}>
      <Image src={evento.imagem} alt={evento.titulo} />

      <Content>
        <Title>{evento.titulo}</Title>
        <Text>Data: {evento.data}</Text>
        <Text>Local: {evento.local}</Text>
      </Content>
    </Card>
  );
}

export default EventCard;

/* 🔥 STYLES */

const Card = styled.div`
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  margin-bottom: 15px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);

  &:hover {
    transform: scale(1.02);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;

  @media (min-width: 768px) {
    height: 200px;
  }
`;

const Content = styled.div`
  padding: 10px;
`;

const Title = styled.h3`
  font-size: 16px;
  margin-bottom: 5px;
`;

const Text = styled.p`
  font-size: 14px;
  color: #555;
`;