import * as React from 'react';

const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => parts.map(p => <Part key={p.name} part={p} />);

const Total = ({ parts }) => (
  <b>
    Total of {parts.map(p => p.exercises).reduce((a, b) => a + b)} exercises
  </b>
);

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
