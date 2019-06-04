import React, { ReactText } from 'react';

import { styled } from 'baseui';
import {
  StyledTable,
  StyledHead,
  StyledHeadCell,
  StyledBody,
  StyledRow,
  StyledCell
} from 'baseui/table';
import { Heading, HeadingLevel } from 'baseui/heading';

interface IProps {
  data: ReactText[][];
  columns: string[];
  header: string;
}

const Container = styled('div', {
  height: '500px',
  width: '600px'
});

const CityTable: React.FunctionComponent<IProps> = ({
  data,
  columns,
  header
}) => (
  <Container>
    <HeadingLevel>
      <Heading styleLevel={4}>{header}</Heading>
    </HeadingLevel>

    <StyledTable>
      <StyledHead>
        {columns.map((col, index) => (
          <StyledHeadCell key={index}>{col}</StyledHeadCell>
        ))}
      </StyledHead>

      <StyledBody>
        {data.map((row, index) => (
          <StyledRow key={index}>
            {row.map((cell, cellIndex) => (
              <StyledCell key={cellIndex}>{cell}</StyledCell>
            ))}
          </StyledRow>
        ))}
      </StyledBody>
    </StyledTable>
  </Container>
);

export default CityTable;
