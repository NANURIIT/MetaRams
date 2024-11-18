package com.nanuri.rams.com.utils;

import static java.time.temporal.ChronoUnit.DAYS;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;

public class DateUtil {

	/**
	 * <pre>
	 * 날짜형식 변환.
	 * isAllWhitespace 로 null check 도 한다.
	 * </pre>
	 * 
	 * @param Stinrg paramDate : inputed Date
	 * @param String dateFormat : 변환후 포맷 (Example : "yyyyMMdd", "yyyy-MM-dd", "yyyy/MM/dd")
	 * 
	 * @return formattedDate
	 * @exception return paramDate(origin)
	 */
	public static String changeDateFormat(String paramDate, String dateFormat) {

		if (!StringUtil.isAllWhitespace(paramDate)  && !StringUtil.isAllWhitespace(dateFormat)) {

			SimpleDateFormat df1 = new SimpleDateFormat("yyyyMMdd");
			SimpleDateFormat df2 = new SimpleDateFormat("yyyy-MM-dd");
			SimpleDateFormat df3 = new SimpleDateFormat("yyyy/MM/dd");

			Date dt;

			try {
				if(paramDate.contains("-")) {

					dt = df2.parse(paramDate);

					if (dateFormat.contains("/")) { paramDate = df3.format(dt); }
					else { paramDate = df1.format(dt); }
					
					return paramDate;
				} else if(paramDate.contains("/")) {
					dt = df3.parse(paramDate);

					if (dateFormat.contains("-")) { paramDate = df2.format(dt); }
					else { paramDate = df1.format(dt); }
					
					return paramDate;
				} else {
					dt = df1.parse(paramDate);

					if (dateFormat.contains("/")) { paramDate = df3.format(dt); }
					else if (dateFormat.contains("-")) { paramDate = df2.format(dt); }
					
					return paramDate;
				}
			} catch (ParseException e) {
				return paramDate;
			}
		}else {
			return paramDate;
		}
	}
	
	/**
	 * 시작일자 종료일자에 대한 일수구하기
	 * @param stdrDt
	 * @param lastDt
	 * @return
	 */
	public static int dateDiff(String stdrDt, String lastDt) {
		
		int rtnValue = 0;
		
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        LocalDate date1 = LocalDate.parse(stdrDt, formatter);
        LocalDate date2 = LocalDate.parse(lastDt, formatter); //LocalDate.now();
        
        int days = (int)DAYS.between(date1, date2);
        rtnValue = days;
        
		return rtnValue;
		
	}
		
	/**
	 * 월 더하기 
	 * @param baseDt
	 * @param iAddCnt
	 * @return
	 */
	public static String monthAdd(String baseDt, int iAddCnt) {
		
		DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		String rtnValue = null;
		
		try {
			Date baseDate = dateFormat.parse(baseDt);

			Calendar baseCalendar = Calendar.getInstance();
			baseCalendar.setTime(baseDate);
			baseCalendar.add(Calendar.MONTH, iAddCnt);

			rtnValue = dateFormat.format(baseCalendar.getTime());
			
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		return rtnValue;
		
	}	
	
	
	
	/**
	 * 일수 더하기
	 * @param baseDt
	 * @param iAddCnt
	 * @return baseDt+iAddCnt
	 */
	public static String dayAdd(String baseDt, int iAddCnt) {
		
		DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		String rtnValue = null;
		
		try {
			Date baseDate = dateFormat.parse(baseDt);

			Calendar baseCalendar = Calendar.getInstance();
			baseCalendar.setTime(baseDate);
			baseCalendar.add(Calendar.DATE, iAddCnt);

			rtnValue = dateFormat.format(baseCalendar.getTime());
			
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		return rtnValue;
		
	}
	
	/**
	 * 입력한 일자에 마지막일자를 리턴
	 * @param baseDt
	 * @return 입력일자에 해당하는 월의 마지막일자
	 */
	public static String lastDate(String baseDt) {

		DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		String rtnValue = null;
		
		try {
			
			Date baseDate = dateFormat.parse(baseDt);
			Calendar baseCalendar = Calendar.getInstance();
			baseCalendar.setTime(baseDate);
			baseCalendar.set(Calendar.DATE, baseCalendar.getActualMaximum(Calendar.DAY_OF_MONTH));
			rtnValue = dateFormat.format(baseCalendar.getTime());	
			
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		return rtnValue;
		
	}

		
		
}
