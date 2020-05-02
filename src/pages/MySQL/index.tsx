import {PageHeaderWrapper} from "@ant-design/pro-layout";
import React, {useState} from "react";
import MonacoEditor from "react-monaco-editor";
import {Button, message} from "antd";
import NodeSQLParser from 'node-sql-parser'
import {camelCase, upperFirst} from 'lodash'
import {compose} from 'lodash/fp'
import style from './index.less'

const parser = new NodeSQLParser.Parser()

function cvtType(t: string) {
  switch (t) {
    case 'TINYINT':
    case 'SMALLINT':
    case 'INT':
    case 'BIGINT':
    case 'FLOAT':
    case 'DOUBLE':
      return 'number'
    case 'DECIMAL':
    case 'CHAR':
    case 'VARCHAR':
    case 'TINYTEXT':
    case 'TEXT':
    case 'MEDIUMTEXT':
    case 'LONGTEXT':
    case 'DATE':
    case 'TIME':
    case 'TIMESTAMP':
    case 'JSON':
      return 'string'
    default:
      throw new TypeError('unsupported mysql type!')
  }
}

const options = {
  selectOnLineNumbers: true,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function editorDidMount(editor: any, monaco: any) {
  console.log('editorDidMount', editor);
  editor.focus();
}

const initSql = `create table Student
(
    FIELD_TINYINT            TINYINT,
    FIELD_SMALLINT           SMALLINT,
    FIELD_INT                INT,
    FIELD_BIGINT             BIGINT,
    FIELD_DECIMAL            DECIMAL,
    FIELD_FLOAT              FLOAT,
    FIELD_DOUBLE             DOUBLE,
    FIELD_CHAR               CHAR,
    FIELD_VARCHAR            VARCHAR(3),
    FIELD_TINYTEXT           TINYTEXT,
    FIELD_TEXT               TEXT,
    FIELD_MEDIUMTEXT         MEDIUMTEXT,
    FIELD_LONGTEXT           LONGTEXT,
    FIELD_DATE               DATE,
    FIELD_TIME               TIME,
    FIELD_TIMESTAMP          TIMESTAMP,
    FIELD_JSON               JSON
);
`
const bigCamelCase: typeof camelCase= compose(upperFirst, camelCase);

const convert = (sql: string) => {
  try {
    const ast = parser.astify(sql)?.[0]
    const ts = `interface ${bigCamelCase(ast.table[0].table)} {\n${
      ast.create_definitions.map((def: any) => `    ${camelCase(def.column.column)}: ${cvtType(def.definition.dataType)}\n`).join('')
    }}`
    return ts
  } catch (e) {
    message.error(e.message)
    return ''
  }
}

const MySQLPage: React.FC = () => {
  const [srcCode, setSrcCode] = useState(initSql);
  const [rstCode, setRstCode] = useState('');
  const cvtCb = () => {
    setRstCode(convert(srcCode))
  }
  return <PageHeaderWrapper>
    <div className={style.wrapper}>
      <MonacoEditor
        width="600"
        height="600"
        language="mysql"
        theme="vs-dark"
        value={srcCode}
        options={options}
        onChange={setSrcCode}
        editorDidMount={editorDidMount}
      />
      <Button type="primary" onClick={cvtCb}>Convert</Button>
      <MonacoEditor
        width="600"
        height="600"
        language="mysql"
        theme="vs-dark"
        value={rstCode}
        options={{readOnly: true}}
      />
    </div>
  </PageHeaderWrapper>
}

export default MySQLPage
