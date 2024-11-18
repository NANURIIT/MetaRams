/**
 * 기간범위 버튼 클릭
 * input-group, button class명 변경 필요
 */
$(function() {

	$('#fromDate').on("change",function(){
		$('.dateInterval > button').click(function(){
			
			let classNm = $(this).attr('class');
			let classNmSplit = classNm.split(' ');
			let clickedClassNm = classNmSplit[2]; 
			
			let fromDateVal =$('#fromDate').val();
			let fromDate = new Date(fromDateVal);
			let date = fromDate.getDate();
			let month = fromDate.getMonth();
			let year = fromDate.getFullYear();
			
			switch(clickedClassNm){	//class명 
				case 'oneWeekApart':	//1주일
					fromDate.setDate( date+7 );
					break; 
				case 'oneMonthApart':	//1개월 
					fromDate.setMonth( month+1 );
					break; 
				case 'oneYearApart':	//1년 
					fromDate.setFullYear( year+1 );
					break; 
				case 'twoYearApart':	//2년 
					fromDate.setFullYear( year+2 );
					break; 
			}
			let toDate = fromDate.toISOString().split("T",1);
			$('#toDate').val(toDate);
			
		});
		
	});
		
});

//onclick 
/*function settingDateInterval(clicked_id){
	let metFDt=$('#metFromDate').val();;
	let metFromDate = new Date(metFDt);
	let date= metFromDate.getDate();
	let month= metFromDate.getMonth();
	let year= metFromDate.getFullYear();

	switch(clicked_id){
		case 'oneWeekApart'
			: metFromDate.setDate( date+7 );
			break; 
		case 'oneMonthApart'	
			: metFromDate.setMonth( month+1 );
			break; 
		case 'oneYearApart'	
			: metFromDate.setFullYear( year+1 );
			break; 
		case 'twoYearApart'	
			: metFromDate.setFullYear( year+2 );
			break; 
	}
	let metToDate = metFromDate.toISOString().split("T",1);
	$('#metToDate').val(metToDate);	
}
*/
