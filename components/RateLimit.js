import PropTypes from 'prop-types';

const RateLimit = ({ rateLimit }) => (
  <div className="absolute top-0 left-0 p-4">
    {rateLimit && (
      <div>
        <div className="text-[#6a737d] text-[20px] mb-2">
          {`${rateLimit.remaining} / ${rateLimit.limit}`}
        </div>
        <p className="uppercase text-[10px] tracking-[1px] m-0 text-[#586069]">
          Requests Left
        </p>
      </div>
    )}
  </div>
);

RateLimit.propTypes = {
  rateLimit: PropTypes.object.isRequired,
};

export default RateLimit;
