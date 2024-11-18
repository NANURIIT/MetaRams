package com.nanuri.rams.com.code;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum InspctCnfrncCcdEnum {

	RISK_MNG_CMMTT				("1","RA",""),
	RISK_INSPCT_CNFRNC			("2","RB",""),
	RISK_INSPCT_WRK_CNFRNC		("3","RC",""),
	JDG_CNFRNC					("4","RD",""),
	WM_GDS_CNFRNC				("5","CA",""),
	CRDT_PRVD_WRK_CNFRNC		("7","CB",""),
	UDWRT_WRK_CNFRNC			("8","CC","")
	;
	
	String value;
	String code;
	String explain;
	
	public static InspctCnfrncCcdEnum getEnumByValue(String value) {
	      for (InspctCnfrncCcdEnum subject : InspctCnfrncCcdEnum.values()) {
	          if (subject.getValue().equals(value)) {
	              return subject;
	          }
	      }
	      return null;
	  }

}
