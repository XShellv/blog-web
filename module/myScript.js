const MyScript = ({ children }) => (
  <script
    dangerouslySetInnerHTML={{
      __html: `(${children && children.toString()})();`,
    }}
  ></script>
);

export default MyScript;
