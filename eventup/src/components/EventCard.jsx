import styled from "styled-components";
import { Link } from "react-router-dom";

function EventCard({ evento }) {
  return (
    <StyledLink
      to={`/event/${evento.id}`}
      state={{ evento }}
    >
      <Card>
        <Image
          src={evento.imagem}
          alt={evento.titulo}
        />

        <Content>
          <Title>{evento.titulo}</Title>

          <Text>
            Data: {evento.data}
          </Text>

          <Text>
            Local: {evento.local}
          </Text>
        </Content>
      </Card>
    </StyledLink>
  );
}

export default EventCard;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Card = styled.div`
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  margin-bottom: 1rem;
  cursor: pointer;

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  transition: all 0.3s ease;

  &:active {
    transform: scale(0.98);
  }

  @media (hover: hover) and (min-width: 1024px) {
    &:hover {
      transform: translateY(-4px);

      box-shadow: 0 4px 16px
        rgba(0, 0, 0, 0.15);
    }
  }

  @media (min-width: 768px) {
    margin-bottom: 1.25rem;
    border-radius: 14px;
  }

  @media (min-width: 1024px) {
    margin-bottom: 0;

    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 160px;

  object-fit: cover;

  background-color: #f0f0f0;

  @media (min-width: 768px) {
    height: 180px;
  }

  @media (min-width: 1024px) {
    height: 200px;
  }

  @media (min-width: 1440px) {
    height: 220px;
  }
`;

const Content = styled.div`
  padding: 0.875rem;

  @media (min-width: 768px) {
    padding: 1rem;
  }

  @media (min-width: 1024px) {
    padding: 1.125rem;
  }
`;

const Title = styled.h3`
  font-size: 1rem;

  margin-bottom: 0.5rem;

  font-weight: 600;

  color: #1a1a1a;

  line-height: 1.4;

  @media (min-width: 768px) {
    font-size: 1.125rem;

    margin-bottom: 0.625rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.25rem;

    margin-bottom: 0.75rem;
  }
`;

const Text = styled.p`
  font-size: 0.875rem;

  color: #666;

  margin-bottom: 0.25rem;

  line-height: 1.5;

  @media (min-width: 768px) {
    font-size: 0.9rem;

    margin-bottom: 0.375rem;
  }

  @media (min-width: 1024px) {
    font-size: 0.95rem;
  }
`;