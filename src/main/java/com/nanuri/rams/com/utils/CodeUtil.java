package com.nanuri.rams.com.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class CodeUtil {
	
	/**
	 * <pre>
	 * 코드 -> 코드명 형식 변환.
	 * 코드가 없으면 null return 한다.
	 * </pre>
	 * 
	 * @param Stinrg code : inputed code
	 * @param List<Map<String, Object>> selectBoxList : 코드/코드명 맵리스트
	 * @param Stinrg groupCd : 찾아야하는 groupCode
	 * 
	 * @return String codeName
	 * @exception return code(original)
	 */
	public static String codeToCodeName(String code, List<Map<String, Object>> selectBoxList, String groupCd) {

		List<Map<String, Object>> groupCdList = new ArrayList<Map<String, Object>>();
		String codeName = null;
		
		if(StringUtil.isAllWhitespace(code)) {
			return code;
		}

		if (selectBoxList.size() > 0) {
			for (int i = 0; selectBoxList.size() > i; i++) {
				Map<String, Object> codeInfo = selectBoxList.get(i);
				if (groupCd.equals(codeInfo.get("CMNS_CD_GRP"))) {
					groupCdList.add(codeInfo);
				}
			}
		}

		if (groupCdList.size() > 0) {
			for (int i = 0; groupCdList.size() > i; i++) {
				Map<String, Object> codeInfo = groupCdList.get(i);
				String cdVlId = codeInfo.get("CD_VL_ID").toString();
				String cdVlNm = codeInfo.get("CD_VL_NM").toString();

				if (code.equals(cdVlId)) {
					if("I016".equals(codeInfo.get("CMNS_CD_GRP").toString())){
						codeName = cdVlId;
					}else {
						codeName = cdVlNm;
					}
					break;
				}
			}
		}

		return codeName;
	}
}
