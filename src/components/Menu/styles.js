import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: ${(props) => props.openMenu? '15vw' : '6vw'};
  height: 100%;
  padding-top: 4.7rem;

  svg {
    margin-right: ${(props) => props.openMenu? '2rem' : '0rem'};
  }
`;

export const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0rem 2.5rem 0rem 2.7rem;
  width: 100%;
  height: 100%;
`;

export const Logo = styled.div`
  margin-bottom: 4.5rem;
  cursor: pointer;

  img {
    width: 3rem;
  }
`;

export const Icons = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   height: 50rem;


  div {
    display: flex;
    flex-direction: row;
    align-items: center;

    p {
      font-size: 1.6rem;
      color: #B3B3B3;
      font-weight: 400;
      transition: color 0.3s;
      transition: font-weight 0.3s;
    }

    svg {
    color: #C1C1C1;
    font-size: 3rem;
    
    transition: color 0.3s;
  }

    
   &:hover {
     svg, p {
      color: #222222;
      font-weight: 600;
     }
   } 
  }

  .menu-item-selected {
    svg, p {
      color: #222222;
      font-weight: 600;
    }
  }

`;


