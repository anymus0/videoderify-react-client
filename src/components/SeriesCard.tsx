import { Series } from './../models/SeriesModel';


const SeriesCard = (props: { series: Series }) => {
  return (
    <div>
      <p>Series name: {props.series.name}</p>
    </div>
  );
};

export default SeriesCard;
