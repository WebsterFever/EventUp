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

/* 🔥 STYLES - Mobile First */

const Card = styled.div`
  /* Mobile base styles */
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  margin-bottom: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  /* Active/focus state for touch devices */
  &:active {
    transform: scale(0.98);
  }

  /* Hover effect only for devices that support hover (desktop) */
  @media (hover: hover) and (min-width: 1024px) {
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }
  }

  /* Tablet adjustments */
  @media (min-width: 768px) {
    margin-bottom: 1.25rem;
    border-radius: 14px;
  }

  /* Desktop adjustments */
  @media (min-width: 1024px) {
    margin-bottom: 0;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
`;

const Image = styled.img`
  /* Mobile base styles */
  width: 100%;
  height: 160px;
  object-fit: cover;
  background-color: #f0f0f0;

  /* Tablet */
  @media (min-width: 768px) {
    height: 180px;
  }

  /* Desktop */
  @media (min-width: 1024px) {
    height: 200px;
  }

  /* Large Desktop */
  @media (min-width: 1440px) {
    height: 220px;
  }
`;

const Content = styled.div`
  /* Mobile base styles */
  padding: 0.875rem;
  
  /* Tablet */
  @media (min-width: 768px) {
    padding: 1rem;
  }
  
  /* Desktop */
  @media (min-width: 1024px) {
    padding: 1.125rem;
  }
`;

const Title = styled.h3`
  /* Mobile base styles */
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.4;
  
  /* Tablet */
  @media (min-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 0.625rem;
  }
  
  /* Desktop */
  @media (min-width: 1024px) {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
  }
`;

const Text = styled.p`
  /* Mobile base styles */
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.25rem;
  line-height: 1.5;
  
  /* Tablet */
  @media (min-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 0.375rem;
  }
  
  /* Desktop */
  @media (min-width: 1024px) {
    font-size: 0.95rem;
  }
`;