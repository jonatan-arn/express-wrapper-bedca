const { Interface } = require("readline");
const xmljs = require("xml-js");

const url = "https://www.bedca.net/bdpub/procquery.php";

const foodGroupsXML = `<?xml version="1.0" encoding="utf-8"?>
		<foodquery>
			<type level="3"/>
			<selection>
				<atribute name="fg_id"/>
				<atribute name="fg_ori_name"/>
				<atribute name="fg_eng_name"/>
			</selection>
			<order ordtype="ASC">
				<atribute3 name="fg_id"/>
			</order>
		</foodquery>`;
function foodGroupXML(id, lang = "f_origen") {
  const langType = "f_eng_name";
  return `<?xml version="1.0" encoding="utf-8"?>
		<foodquery>
			<type level="1"/>
			<selection>
				<atribute name="*"/>
			</selection>
			<condition>
				<cond1>
					<atribute1 name="foodgroup_id"/>
				</cond1>
				<relation type="EQUAL"/>
				<cond3>${id}</cond3>
			</condition>
			<condition>
				<cond1>
					<atribute1 name="${lang}"/>
				</cond1>
				<relation type="EQUAL"/>
				<cond3>BEDCA</cond3>
			</condition>
			<order ordtype="ASC">
				<atribute3 name="f_eng_name"/>
			</order>
		</foodquery>`;
}
function foodXml(id) {
  return `<?xml version="1.0" encoding="utf-8"?>
<foodquery>
    <type level="2"/>
    <selection>
        <atribute name="f_id"/>
        <atribute name="f_ori_name"/>
        <atribute name="f_eng_name"/>
        <atribute name="sci_name"/>
        <atribute name="langual"/>
        <atribute name="foodexcode"/>
        <atribute name="mainlevelcode"/>
        <atribute name="codlevel1"/>
        <atribute name="namelevel1"/>
        <atribute name="codsublevel"/>
        <atribute name="codlevel2"/>
        <atribute name="namelevel2"/>
        <atribute name="f_des_esp"/>
        <atribute name="f_des_ing"/>
        <atribute name="photo"/>
        <atribute name="edible_portion"/>
        <atribute name="f_origen"/>
        <atribute name="c_id"/>
        <atribute name="c_ori_name"/>
        <atribute name="c_eng_name"/>
        <atribute name="eur_name"/>
        <atribute name="componentgroup_id"/>
        <atribute name="glos_esp"/>
        <atribute name="glos_ing"/>
        <atribute name="cg_descripcion"/>
        <atribute name="cg_description"/>
        <atribute name="best_location"/>
        <atribute name="v_unit"/>
        <atribute name="moex"/>
        <atribute name="stdv"/>
        <atribute name="min"/>
        <atribute name="max"/>
        <atribute name="v_n"/>
        <atribute name="u_id"/>
        <atribute name="u_descripcion"/>
        <atribute name="u_description"/>
        <atribute name="value_type"/>
        <atribute name="vt_descripcion"/>
        <atribute name="vt_description"/>
        <atribute name="mu_id"/>
        <atribute name="mu_descripcion"/>
        <atribute name="mu_description"/>
        <atribute name="ref_id"/>
        <atribute name="citation"/>
        <atribute name="at_descripcion"/>
        <atribute name="at_description"/>
        <atribute name="pt_descripcion"/>
        <atribute name="pt_description"/>
        <atribute name="method_id"/>
        <atribute name="mt_descripcion"/>
        <atribute name="mt_description"/>
        <atribute name="m_descripcion"/>
        <atribute name="m_description"/>
        <atribute name="m_nom_esp"/>
        <atribute name="m_nom_ing"/>
        <atribute name="mhd_descripcion"/>
        <atribute name="mhd_description"/>
    </selection>
    <condition>
        <cond1>
            <atribute1 name="f_id"/>
        </cond1>
        <relation type="EQUAL"/>
        <cond3>${id}</cond3>
    </condition>
    <condition>
        <cond1>
            <atribute1 name="publico"/>
        </cond1>
        <relation type="EQUAL"/>
        <cond3>1</cond3>
    </condition>
    <order ordtype="ASC">
        <atribute3 name="componentgroup_id"/>
    </order>
</foodquery>`;
}
function listByNameXml(name, lang = "f_ori_name") {
  const langType = "f_eng_name";

  return `<?xml version="1.0" encoding="utf-8"?>
<foodquery>
    <type level="1"/>
    <selection>
        <atribute name="f_id"/>
        <atribute name="f_ori_name"/>
        <atribute name="langual"/>
        <atribute name="f_eng_name"/>
        <atribute name="f_origen"/>
    </selection>
    <condition>
        <cond1>
            <atribute1 name="f_ori_name"/>
        </cond1>
        <relation type="LIKE"/>
        <cond3>${name}</cond3>
    </condition>
    <condition>
        <cond1>
            <atribute1 name="f_origen"/>
        </cond1>
        <relation type="EQUAL"/>
        <cond3>BEDCA</cond3>
    </condition>
    <order ordtype="ASC">
        <atribute3 name="f_ori_name"/>
    </order>
</foodquery>`;
}
function xmlToObejct(xml) {
  const options = { compact: true, ignoreComment: true, spaces: 4 };
  return xmljs.xml2js(xml, options);
}
test: {
}
module.exports = {
  xmlToObejct,
  url,
  foodGroupsXML,
  foodGroupXML,
  foodXml,
  listByNameXml,
};
