-- Backfill existing YYYY-MM values to YYYY-MM-DD format
update initiatives
set month_assigned = month_assigned || '-01'
where length(month_assigned) = 7;
